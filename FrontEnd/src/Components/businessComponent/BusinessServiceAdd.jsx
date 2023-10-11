import React, { useState } from "react";
import "./businessAddService.css";
import BusinessVenue from "./BusinessVenue";
import VehicleBusiness from "./VehicleBusiness";
import BUsinessCatering from "./BUsinessCatering";

export default function BusinessServiceAdd() {
  const [venue, setVenue] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [catering, setCatering] = useState(false);
  // Function to handle the select change
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    // Update the state based on the selected value
    if (selectedValue === "venue") {
      setVenue(true);
      setVehicle(false);
      setCatering(false);
    } else if (selectedValue === "vehicle") {
      setVenue(false);
      setVehicle(true);
      setCatering(false);
    } else if (selectedValue === "catering") {
      setVenue(false);
      setVehicle(false);
      setCatering(true);
    }
  };

  return (
    <div className="h-full container mx-auto p-4 ">
      <div className="overflow-auto max-h-full mt-6 w-full pb-20">
        <label className="block text-2xl text-stone-600 font-sans font-bold">
          Select your Service Type
        </label>
        <select
          className="block w-44 border rounded-md cursor-pointer"
          id="dropdown"
          name="service"
          onChange={handleSelectChange}
          value={
            venue
              ? "venue"
              : vehicle
              ? "vehicle"
              : catering
              ? "catering"
              : "select your value"
          } // Set the value based on state
        >
          <option value="">Select your service</option>
          <option value="venue">Venue</option>
          <option value="vehicle">Vehicle</option>
          <option value="catering">Catering</option>
        </select>

        {venue && <BusinessVenue />}

        {vehicle && <VehicleBusiness />}

        {catering && <BUsinessCatering />}
      </div>
    </div>
  );
}
