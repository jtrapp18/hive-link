
from datetime import datetime, timedelta

seed_data = {
    "events": [
        {
            "title": "Spring Hive Inspection",
            "descr": "Join us for a thorough spring inspection to ensure all hives are ready for the upcoming season. We'll check for any signs of disease and prepare the hives for new colonies.",
            "date": (datetime.now() + timedelta(days=45)).date(),
            "zipcode": "06881"
        },
        {
            "title": "Hive Expansion Workshop",
            "descr": "Learn how to expand your hive setup with new supers, frames, and foundation. This hands-on workshop will guide you through the steps of hive expansion.",
            "date": (datetime.now() + timedelta(days=60)).date(),
            "zipcode": "06883"
        },
        {
            "title": "Mite Management Seminar",
            "descr": "A discussion on the latest techniques and treatments for managing varroa mites. Learn about different approaches and share your experiences with fellow beekeepers.",
            "date": (datetime.now() + timedelta(days=75)).date(),
            "zipcode": "06461"
        },
        {
            "title": "Honey Harvesting Day",
            "descr": "Come harvest honey from our shared apiary. We’ll demonstrate extraction techniques, from uncapping frames to bottling the sweet results.",
            "date": (datetime.now() + timedelta(days=90)).date(),
            "zipcode": "06606"
        },
        {
            "title": "Winter Hive Preparation",
            "descr": "Get your hives ready for the winter season with our winter preparation workshop. Topics include insulation, feeding, and pest management during the cold months.",
            "date": (datetime.now() + timedelta(days=180)).date()
        },
        {
            "title": "Queen Rearing Basics",
            "descr": "Learn the art of queen rearing, from grafting larvae to managing mating nucs. This session will cover the essentials of raising healthy queens for your colonies.",
            "date": (datetime.now() + timedelta(days=120)).date()
        },
        {
            "title": "Bee Habitat Restoration Day",
            "descr": "Join us for a day of planting native flowers and trees to restore local bee habitats. Help improve forage options for bees while learning about sustainable practices.",
            "date": (datetime.now() + timedelta(days=135)).date()
        },
        {
            "title": "Beekeeping 101",
            "descr": "A beginner-friendly class for new beekeepers. We'll cover the basics of hive management, bee biology, and how to get started with your own beekeeping journey.",
            "date": (datetime.now() + timedelta(days=30)).date()
        },
        {
            "title": "Pest Identification and Control",
            "descr": "Bring your concerns and learn how to identify common hive pests, including ants, mites, and wax moths. We'll also discuss the best methods for controlling these pests.",
            "date": (datetime.now() + timedelta(days=50)).date()
        },
        {
            "title": "Bee-Friendly Gardening for Beginners",
            "descr": "This event will teach you how to create a bee-friendly garden. From selecting the right plants to providing water sources, you’ll learn how to help local pollinators thrive.",
            "date": (datetime.now() + timedelta(days=100)).date()
        }
    ],
    "forums": [
        {"category": "General", "title": "New Beekeepers: Getting Started in 2025"},
        {"category": "Beekeeping Tips", "title": "Top Tips for Spring Hive Maintenance"},
        {"category": "Hive Management", "title": "How to Handle Overcrowding in Your Hives"},
        {"category": "Pests & Diseases", "title": "Dealing with Varroa Mites: Best Practices"},
        {"category": "Honey Production", "title": "Maximizing Honey Yield in Urban Settings"},
        {"category": "Queen Rearing", "title": "Breeding Strong Queens for Your Apiary"},
        {"category": "Hive Expansion", "title": "Expanding Your Hive Setup: A Step-by-Step Guide"},
        {"category": "Beekeeping Equipment", "title": "Essential Tools for New Beekeepers"},
        {"category": "Pollinator Health", "title": "Protecting Pollinators Beyond the Hive"},
        {"category": "Winterizing", "title": "Preparing Your Hives for the Cold Season"},
        {"category": "Sustainable Practices", "title": "Eco-Friendly Beekeeping Techniques"},
        {"category": "Community News", "title": "Upcoming Beekeeping Workshops and Events"}
    ]
}