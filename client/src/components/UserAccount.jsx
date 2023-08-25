import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultUserImage from "@/assets/images/user.jpg";

import { LogOut, User, LayoutDashboardIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function UserAccount({ user, logout }) {
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user?.image ?? defaultUserImage}
            alt={user?.email}
          />
          <AvatarFallback>{user?.email}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>{user?.email}</span>
          </DropdownMenuItem>
          {user?.role === "admin" && (
            <Link to="/admin">
              <DropdownMenuItem>
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
