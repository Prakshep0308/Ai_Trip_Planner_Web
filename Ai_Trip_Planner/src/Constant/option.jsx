export const SelectTravelList = [
  {
    id: 1,
    tittle: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈",
    people: "1",
  },
  {
    id: 2,
    tittle: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    tittle: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    tittle: "Frineds",
    desc: "A bunch of thrill-seekes",
    icon: "🍾",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOption = [
  {
    id: 1,
    tittle: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    tittle: "Moderate",
    desc: "Keep cost on the average site",
    icon: "💰",
  },
  {
    id: 3,
    tittle: "Luxury",
    desc: "Dont warry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {total Days} Days for {traveler} with a {budget} budget, give me Hotels options list with Hotel Name, Hotel address, Price in rupee, hotel image url, geo coordinates, rating, descriptions and suggest itinerary option list with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format and make sure that itinerary return in array format of indexs Day: day 1, day 2...soon";
