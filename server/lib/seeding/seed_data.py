
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
        {
            "category": "General",
            "title": "New Beekeepers: Getting Started in 2025",
            "messages": [
                {
                    "content": "What’s the best way to start beekeeping?",
                    "replies": [
                        {"content": "Start with one or two hives and take a beginner course."},
                        {"content": "Find a local mentor. Hands-on experience is invaluable."}
                    ]
                },
                {
                    "content": "What equipment do I need to get started?",
                    "replies": []
                }
            ]
        },
        {
            "category": "Beekeeping Tips",
            "title": "Top Tips for Spring Hive Maintenance",
            "messages": [
                {
                    "content": "How do I check if my bees survived winter?",
                    "replies": [
                        {"content": "Tap the hive gently and listen for buzzing."},
                        {"content": "On warm days, check for bees flying in and out."}
                    ]
                }
            ]
        },
        {
            "category": "Hive Management",
            "title": "How to Handle Overcrowding in Your Hives",
            "messages": [
                {
                    "content": "When should I add a second super?",
                    "replies": [
                        {"content": "When 7-8 frames are drawn out, it's time to add another super."}
                    ]
                }
            ]
        },
        {
            "category": "Pests & Diseases",
            "title": "Dealing with Varroa Mites: Best Practices",
            "messages": [
                {
                    "content": "What’s the best way to check for mites?",
                    "replies": [
                        {"content": "Try a sugar shake or alcohol wash test."}
                    ]
                }
            ]
        },
        {
            "category": "Honey Production",
            "title": "Maximizing Honey Yield in Urban Settings",
            "messages": [
                {
                    "content": "How do I ensure a good nectar flow in my area?",
                    "replies": [
                        {"content": "Plant a variety of flowers that bloom throughout the season."}
                    ]
                }
            ]
        },
        {
            "category": "Queen Rearing",
            "title": "Breeding Strong Queens for Your Apiary",
            "messages": [
                {
                    "content": "What’s the best method for grafting larvae?",
                    "replies": [
                        {"content": "I prefer using a Chinese grafting tool—it makes transferring larvae much easier."},
                        {"content": "Make sure to keep the larvae hydrated. Drying out is one of the biggest risks!"}
                    ]
                },
                {
                    "content": "How do you select the best queens for breeding?",
                    "replies": [
                        {"content": "Look for strong laying patterns and gentle temperament. Productivity and disease resistance are also key factors."}
                    ]
                }
            ]
        },
        {
            "category": "Hive Expansion",
            "title": "Expanding Your Hive Setup: A Step-by-Step Guide",
            "messages": [
                {
                    "content": "When’s the best time to add another super?",
                    "replies": [
                        {"content": "When about 80% of the current frames are drawn out, it’s time to add another super."}
                    ]
                },
                {
                    "content": "Can I split my hive without a new queen?",
                    "replies": [
                        {"content": "Yes! If you leave enough eggs and young larvae, the bees can raise their own queen."}
                    ]
                }
            ]
        },
        {
            "category": "Beekeeping Equipment",
            "title": "Essential Tools for New Beekeepers",
            "messages": [
                {
                    "content": "What’s the best type of smoker fuel?",
                    "replies": [
                        {"content": "Pine needles work great—they burn slow and produce cool smoke."},
                        {"content": "I use wood pellets for consistency and longer burn times."}
                    ]
                },
                {
                    "content": "Is it worth investing in an electric honey extractor?",
                    "replies": [
                        {"content": "If you have more than a few hives, definitely! It saves a ton of time."}
                    ]
                }
            ]
        },
        {
            "category": "Pollinator Health",
            "title": "Protecting Pollinators Beyond the Hive",
            "messages": [
                {
                    "content": "What are the best flowers for attracting pollinators?",
                    "replies": [
                        {"content": "Native wildflowers are ideal! Bees love lavender, sunflowers, and coneflowers."}
                    ]
                },
                {
                    "content": "How can urban beekeepers support wild pollinators?",
                    "replies": [
                        {"content": "Creating small pollinator gardens and avoiding pesticides can make a big difference."}
                    ]
                }
            ]
        },
        {
            "category": "Sustainable Practices",
            "title": "Eco-Friendly Beekeeping Techniques",
            "messages": [
                {
                    "content": "Has anyone tried top bar hives for more natural beekeeping?",
                    "replies": [
                        {"content": "Yes! They allow for minimal intervention and a more natural comb-building process."}
                    ]
                },
                {
                    "content": "What are some good alternatives to chemical mite treatments?",
                    "replies": [
                        {"content": "I use oxalic acid vaporization and screened bottom boards to help control mites naturally."}
                    ]
                }
            ]
        },
        {
            "category": "Community News",
            "title": "Upcoming Beekeeping Workshops and Events",
            "messages": [
                {
                    "content": "Anyone attending the state beekeeping conference this year?",
                    "replies": [
                        {"content": "I’ll be there! Looking forward to the queen rearing session."}
                    ]
                },
                {
                    "content": "Any local workshops on hive inspection techniques?",
                    "replies": [
                        {"content": "Our beekeeping club is hosting one next month—should be a great learning opportunity!"}
                    ]
                }
            ]
        },
        {"category": "Winterizing", "title": "Preparing Your Hives for the Cold Season", "messages": [
            {"content": "What’s the best way to insulate hives for winter?",
            "replies": [
                {
                "content": "I use foam insulation boards around my hives and it works great! Also, make sure to provide ventilation to prevent moisture buildup."
                },
                {
                "content": "I wrap my hives in black roofing felt. It absorbs sunlight and keeps the hive warm during the day."
                }
            ]
            },
            {"content": "Do I need to reduce the hive entrance in winter?",
            "replies": [
                {
                "content": "Yes, reducing the entrance helps keep out cold drafts and prevents mice from getting in. I use an entrance reducer or even just a small piece of wood."
                }
            ]
            },
            {"content": "Should I keep feeding my bees sugar syrup during winter?",
            "replies": [
                {
                "content": "Once the temperature drops below 50°F, bees can’t process liquid feed well. I switch to fondant or sugar bricks to help them through the cold months."
                }
            ]
            },
            {"content": "How can I tell if my hive has enough honey stores for winter?",
            "replies": []
            },
            {"content": "I’ve heard of using quilt boxes to manage condensation. Has anyone tried this?",
            "replies": []
            },
            {"content": "What’s the ideal number of frames of honey for overwintering in a northern climate?",
            "replies": []
            }
        ]}
    ]
}