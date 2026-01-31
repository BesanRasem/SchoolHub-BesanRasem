export async function GET() {
  const schools = [
    {
      name: "Al Amal School",
      rating: 4,
      image:
        "https://i.pinimg.com/1200x/da/0b/8a/da0b8a73587be2b85df3a6d62ad22f67.jpg",
    },
    {
      name: "Future Leaders Academy",
      rating: 5,
      image:
        "https://i.pinimg.com/736x/26/8f/39/268f3921aa3abc42f44efc86f8fa0d7e.jpg",
    },
    {
      name: "Bright Minds School",
      rating: 3,
      image:
        "https://i.pinimg.com/1200x/64/52/f4/6452f4f22ad6dccf7355984635138cb5.jpg",
    },
    {
      name: "Hope International School",
      rating: 2,
      image:
        "https://i.pinimg.com/1200x/67/76/d5/6776d5d1106a0afc8416a39deec3597a.jpg",
    },
    {
      name: "Sunrise International Academy",
      rating: 5,
      image:
        "https://i.pinimg.com/736x/80/25/95/802595b51c7dfc4ec06f7517b2609102.jpg",
    },
    {
      name: "Green Valley School",
      rating: 1,
      image:
        "https://i.pinimg.com/1200x/27/72/da/2772da9493ac6dae42138b0c01cfe5a6.jpg",
    },
  ];

      return Response.json(schools);

}
