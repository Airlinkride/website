export type Vehicle = {
  id: string;
  name: string;
  category: "Sedan" | "SUV";
  image: string;
  passengers: string;
  luggage: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "cadillac-escalade",
    name: "Cadillac Escalade",
    category: "SUV",
    image: "/vehicles/cadillac-escalade.png",
    passengers: "Up to 6 passengers",
    luggage: "Up to 6 bags",
  },
  {
    id: "chevrolet-suburban",
    name: "Chevrolet Suburban",
    category: "SUV",
    image: "/vehicles/chevrolet-suburban.png",
    passengers: "Up to 6 passengers",
    luggage: "Up to 6 bags",
  },
  {
    id: "ford-expedition",
    name: "Ford Expedition",
    category: "SUV",
    image: "/vehicles/ford-expedition.png",
    passengers: "Up to 6 passengers",
    luggage: "Up to 6 bags",
  },
  {
    id: "lincoln-navigator",
    name: "Lincoln Navigator",
    category: "SUV",
    image: "/vehicles/lincoln-navigator.png",
    passengers: "Up to 6 passengers",
    luggage: "Up to 6 bags",
  },
  {
    id: "toyota-grand-highlander",
    name: "Toyota Grand Highlander",
    category: "SUV",
    image: "/vehicles/toyota-grand-highlander.png",
    passengers: "Up to 6 passengers",
    luggage: "Up to 5 bags",
  },
];