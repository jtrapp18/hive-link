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

def pest_likelihood(temp, honey_weight=None):
    """Adjust pest presence based on temperature and honey weight."""
    honey_factor = 1 if honey_weight is None else max(0.5, min(1.5, 50 / (honey_weight + 1)))  # Less honey = more pests

    return {
        "ants_present": random() < honey_factor * (0.2 + 0.03 * temp),
        "slugs_present": random() < honey_factor * (0.3 - 0.01 * temp),
        "hive_beetles_present": random() < honey_factor * (0.1 + 0.02 * temp),
        "wax_moths_present": random() < honey_factor * 0.1,
        "wasps_hornets_present": random() < honey_factor * (0.05 + 0.02 * temp),
        "mice_present": random() < honey_factor * (0.3 - 0.02 * temp),
        "robber_bees_present": random() < honey_factor * 0.2,
    }

def varroa_mite_model(temp, oxalic, formic, thymol, apistan, honey_weight=None):
    """Model mite growth based on temperature, treatments, and honey weight."""
    base_mites = randint(0, 80)
    temp_factor = 1.1 ** (temp / 10)

    honey_factor = 1 if honey_weight is None else max(0.5, min(1.5, 50 / (honey_weight + 1)))  # Less honey = more mites

    treatment_effect = 0.7 * oxalic + 0.8 * formic + 0.6 * thymol + 0.9 * apistan
    
    mite_count = max(0, int(base_mites * temp_factor * honey_factor - treatment_effect))
    mite_count = max(mite_count, base_mites // 10)  # Never fully zero unless mites started as 0

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