"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Store, Mail, Lock, User, Phone, MapPin } from "lucide-react";

export default function AuthPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    ownerName: "",
    phone: "",
    address: "",
  });

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later");
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");

    // Validation
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (
      !registerData.restaurantName ||
      !registerData.ownerName ||
      !registerData.phone ||
      !registerData.address
    ) {
      setError("All restaurant information is required");
      setIsLoading(false);
      return;
    }

    try {
      await signup(registerData.email, registerData.password, {
        restaurantName: registerData.restaurantName,
        ownerName: registerData.ownerName,
        phone: registerData.phone,
        address: registerData.address,
      });
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-full">
              <Store className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Restaurant Portal
          </CardTitle>
          <CardDescription className="text-gray-600">
            Manage your restaurant with Alpine Delivery Co.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="restaurant@example.com"
                      className="pl-10"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restaurant Name</Label>
                    <div className="relative">
                      <Store className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="restaurant-name"
                        placeholder="Your Restaurant"
                        className="pl-10"
                        value={registerData.restaurantName}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            restaurantName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Owner Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="owner-name"
                        placeholder="John Doe"
                        className="pl-10"
                        value={registerData.ownerName}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            ownerName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="restaurant@example.com"
                      className="pl-10"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+64 3 123 4567"
                      className="pl-10"
                      value={registerData.phone}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="123 Main St, Hanmer Springs"
                      className="pl-10"
                      value={registerData.address}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleRegister}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Restaurant Account"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
