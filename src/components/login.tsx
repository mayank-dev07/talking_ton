"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
// import { useUserStore } from "@/zustand/zustand";
import { POST } from "@/config/axios/requests";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  // const email = useUserStore((state) => state.email);
  const [email, setEmail] = React.useState("");
  // const { setEmail } = useUserStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("Form Submitted", values);
    setEmail(values.email);

    try {
      const { response, error } = await POST("/login", {
        email: values.email,
        password: values.password,
      });
      console.log("Response:", response);

      if (response?.status !== 200 && response?.status !== 201) {
        throw new Error("Login failed");
      }

      const data = response?.data;

      if (error || !data?.user) {
        console.log("Error:", error);
      }

      localStorage.setItem("email", data?.user?.email);
      router.push("/home");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      form.reset();
    }
  };

  React.useEffect(() => {
    if (!email) console.log(email);
    else {
      router.push("/home");
    }
  });

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email"
                      className=" hover:shadow-lg transition-transform transform hover:scale-105"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-black" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Password"
                      className=" hover:shadow-lg transition-transform transform hover:scale-105"
                    />
                  </FormControl>
                  <FormMessage className="text-black" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
