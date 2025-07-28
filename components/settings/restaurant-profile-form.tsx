"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function RestaurantProfileForm() {
  const [form, setForm] = useState({
    name: "Hanmer Springs Pizza Co.",
    description: "The best pizza in Hanmer Springs!",
    phone: "+64 3 123 4567",
    address: "123 Main Street, Hanmer Springs, 7334",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save logic
    alert("Profile saved (mock)");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <Input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-[#2F5233] text-white hover:bg-green-800"
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
