import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { AccountTab, PasswordTab } from './tabs'
 
export const Settings = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <AccountTab />
      </TabsContent>
      <TabsContent value="password">
				<PasswordTab />
      </TabsContent>
    </Tabs>
  )
}