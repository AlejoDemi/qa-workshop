import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ThemeToggler } from './components/ThemeToggler';
import { Toaster } from './components/ui/toaster';

const CustomNavLink = (props) => {
	return (
		<NavLink
			className={({ isActive }) => {
				return `text-lg font-semibold px-2 py-3 rounded-lg ${isActive && 'bg-slate-700'}`
			}}
			{...props}
		/>
	)
}

export const Root = () => {
	return (
		<main className='flex flex-col gap-12 items-center p-10'>
			<h1 className='text-4xl font-extrabold'>🤓 Unit Testing 🤓</h1>
			<ThemeToggler />
			<NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <CustomNavLink to="/counter">
              Counter
            </CustomNavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <CustomNavLink to="/posts">
              Posts
            </CustomNavLink>
          </NavigationMenuItem>
					<NavigationMenuItem>
            <CustomNavLink to="/settings">
              Settings
            </CustomNavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

			<Outlet />

      <Toaster />
		</main>
	)
}
