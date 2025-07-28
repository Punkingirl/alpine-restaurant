"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewOrdersList } from "@/components/orders/new-orders-list"
import { PreparingOrdersList } from "@/components/orders/preparing-orders-list"
import { ReadyOrdersList } from "@/components/orders/ready-orders-list"
import { CompletedOrdersList } from "@/components/orders/completed-orders-list"

export function OrdersTabs() {
  return (
    <Tabs defaultValue="new">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="preparing">Preparing</TabsTrigger>
        <TabsTrigger value="ready">Ready</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="new">
        <NewOrdersList />
      </TabsContent>
      <TabsContent value="preparing">
        <PreparingOrdersList />
      </TabsContent>
      <TabsContent value="ready">
        <ReadyOrdersList />
      </TabsContent>
      <TabsContent value="completed">
        <CompletedOrdersList />
      </TabsContent>
    </Tabs>
  )
}
