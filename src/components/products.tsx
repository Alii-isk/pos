import React from "react";

import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function Products() {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "آس بري",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "افوكادو",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana bic prange",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    }, {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[120px]"
              src={"https://nextui.org/images/fruit-1.jpeg"}
            />  
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-50 0">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
