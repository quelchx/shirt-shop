/** directory will hold any routes stored within the navigation bar */
import { v4 as uuidv4 } from "uuid";

module.exports = [
  {
    id: uuidv4(),
    path: "/",
    name: "Home",
  },
  {
    id: uuidv4(),
    path: "/store",
    name: "Store",
  },
  {
    id: uuidv4(),
    path: "/about",
    name: "About Us",
  },
  {
    id: uuidv4(),
    path: "/contact",
    name: "Contact Us",
  },
];
