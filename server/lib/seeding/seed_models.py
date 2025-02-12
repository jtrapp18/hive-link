import pandas as pd
from random import randint, choice as rc, random

def generate_weather_data(date_checked):
    """ Generate inspection data with realistic correlations. """

    # Extract the month from date_checked
    month = pd.to_datetime(date_checked).month
        
    # Define temperature ranges by season (in Celsius)
    if month in [12, 1, 2]:  # Winter
        temp = randint(-10, 10) + random()
        weather = rc(["Snowy", "Overcast", "Windy"])
        humidity = randint(20, 80) + random()  # Wider range for winter

    elif month in [3, 4, 5]:  # Spring
        temp = randint(5, 25) + random()
        weather = rc(["Rainy", "Windy", "Overcast", "Sunny"])
        humidity = randint(40, 90) + random()  # Spring tends to be more humid

    elif month in [6, 7, 8]:  # Summer
        temp = randint(20, 40) + random()
        weather = rc(["Sunny", "Windy", "Overcast"])
        humidity = randint(30, 80) + random()  # Avoiding too low values

    else:  # Fall (Sep–Nov)
        temp = randint(5, 25) + random()
        weather = rc(["Overcast", "Rainy", "Windy", "Sunny"])
        humidity = randint(30, 85) + random()  # Similar to Spring

    # Adjust humidity based on weather conditions
    if weather == "Rainy":
        humidity = min(100, max(humidity, randint(80, 100) + random()))  # Cap at 100
    elif weather == "Snowy":
        humidity = min(100, max(humidity, randint(70, 90) + random()))  # Cap at 100
    elif weather == "Sunny":
        humidity = max(0, min(humidity, randint(30, 60) + random()))  # Ensure >= 0

    return {
        "temp": round(temp, 1),
        "weather_conditions": weather,
        "humidity": round(humidity, 1),
    }

def pest_likelihood(temp):
    """Adjust pest presence probabilities based on temperature (Celsius)"""

    return {
        "ants_present": random() < (0.2 + 0.005 * (temp - 15)),   # Increase in warmth
        "slugs_present": random() < (0.3 - 0.002 * (temp - 15)),  # Decrease in warmth
        "hive_beetles_present": random() < (0.1 + 0.004 * (temp - 15)),  # Thrive in warmth
        "wax_moths_present": random() < 0.1,  # Mostly constant
        "wasps_hornets_present": random() < (0.05 + 0.003 * (temp - 15)), # Slight increase
        "mice_present": random() < (0.3 - 0.005 * (temp - 15)),  # Less likely in warmth
        "robber_bees_present": random() < 0.2,  # Constant for now
    }

def varroa_mite_model(temp, oxalic, formic, thymol, apistan, starting_mite_count=None, hive_age_weeks=52):
    """Model mite growth based on temperature, treatments, and hive age (in weeks)."""

    # Initialize mites based on hive age
    if starting_mite_count is not None:
        base_mites = starting_mite_count
    else:
        mite_probability = 0.8 if hive_age_weeks > 24 else 0.4  # Older hives more likely to have mites
        base_mites = randint(5, 40) if random() < mite_probability else 0  

    # Temperature scaling (mites reproduce more in warmth)
    temp_factor = 1.02 ** (temp - 15)

    # Treatment effect (stronger impact to control mites)
    treatment_effect = 1.2 * oxalic + 1.3 * formic + 1.1 * thymol + 1.4 * apistan  

    # Mite population change
    mite_count = max(0, int(base_mites * temp_factor - treatment_effect))

    # Ensure low but persistent mites if they were present before
    mite_count = max(mite_count, base_mites // 10) if base_mites > 0 else 0  

    return mite_count

def treatment_dosages(mite_count, prev_treatment=None, prev_dosage=(0, 0, 0, 0), treatment_streak=0):
    """Determine treatment dosage based on mite count and ensure treatments last for a reasonable duration."""
    
    treatments = ["oxalic", "formic", "thymol", "apistan"]
    
    # Stick with the previous treatment unless we need to change
    if prev_treatment and treatment_streak < 3:
        primary_treatment = prev_treatment
    else:
        # If the streak is long (6+ inspections) or mites stay high, switch treatment
        if mite_count > 50 and treatment_streak >= 3:
            primary_treatment = rc([t for t in treatments if t != prev_treatment])
        else:
            primary_treatment = prev_treatment or rc(treatments)  # First-time selection

    # Dosage defaults to 0 if mites are low
    if mite_count < 20:
        return (0, 0, 0, 0), primary_treatment, 0  # Reset streak if no treatment

    # Determine treatment doses
    treatment_doses = {
        "oxalic": randint(1, 3) if primary_treatment == "oxalic" else 0,
        "formic": randint(1, 3) if primary_treatment == "formic" else 0,
        "thymol": randint(1, 2) if primary_treatment == "thymol" else 0,
        "apistan": randint(1, 2) if primary_treatment == "apistan" else 0,
    }

    # Increase or decrease treatment intensity based on mites
    if mite_count > 50:
        treatment_doses[primary_treatment] = min(treatment_doses[primary_treatment] + 1, 3)  # Increase dose
    elif mite_count < 50 and prev_dosage[treatments.index(primary_treatment)] > 0:
        treatment_doses[primary_treatment] = max(treatment_doses[primary_treatment] - 1, 0)  # Decrease dose

    # Increase streak count if continuing same treatment
    new_treatment_streak = treatment_streak + 1 if primary_treatment == prev_treatment else 1

    return tuple(treatment_doses[t] for t in treatments), primary_treatment, new_treatment_streak

def calculate_weekly_honey(temp, varroa_mite_count, super_count, has_larvae, has_eggs, treatment_factor, pests):

    """Estimate weekly honey production based on key hive conditions, now factoring in pests."""
    base_honey = randint(0, 5)  # Base random production (e.g., 0-5 lbs per week)

    # Temperature effect: More honey in ideal temps (65-85°F)
    temp_factor = max(0.2, 1 - abs(temp - 25) / 15)  # Scales from 0 to 1

    # Mite effect: Reduce production if infestation is high
    mite_factor = max(0.5, 1 - varroa_mite_count / 100)  # If mites > 100, production is halved

    # Super count effect: More supers → more room for honey
    super_factor = 1 + (super_count * 0.1)  

    # Brood effect: If larvae and eggs present, hive is active and likely producing well
    brood_factor = 1.2 if has_larvae or has_eggs else 1

    # Treatment impact (if applicable)
    treatment_factor = max(0.5, treatment_factor)  

    # Pest impact: Scale honey reduction based on severity
    pest_penalty = 1 - (
        (0.2 if pests["ants_present"] else 0) +
        (0.1 if pests["slugs_present"] else 0) +
        (0.3 if pests["hive_beetles_present"] else 0) +
        (0.4 if pests["wax_moths_present"] else 0) +
        (0.3 if pests["wasps_hornets_present"] else 0) +
        (0.5 if pests["mice_present"] else 0) +
        (0.4 if pests["robber_bees_present"] else 0)
    )
    pest_penalty = max(0.3, pest_penalty)  # Ensure honey production isn't completely zeroed out

    return base_honey * temp_factor * mite_factor * super_factor * brood_factor * treatment_factor * pest_penalty
