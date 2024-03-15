import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    repeatNewPassword: z.string().min(1, "Repeat new password is required"),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "New passwords must match",
    path: ["repeatNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password can't be the same as current password",
    path: ["newPassword"],
  });

export const PasswordTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();

  const onSubmit = (data) => {
    toast({
      title: "Success",
      description: "Password changed",
      status: "success",
    });
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="repeatNewPassword">Repeat new password</Label>
            <Input
              id="repeatNewPassword"
              type="password"
              {...register("repeatNewPassword")}
            />
            {errors.repeatNewPassword && (
              <p>{errors.repeatNewPassword.message}</p>
            )}
          </div>
          <CardFooter>
            <Button type="submit">Save password</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
