"use client";

import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  AlertTriangle,
  Save,
  Key,
  Shield,
  Bell,
  Palette,
  Globe,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sticky top-0  z-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg ml-14">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl sticky top-24">
              <CardContent className="pt-6">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                  >
                    <User className="h-4 w-4" />
                    Profile
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <Lock className="h-4 w-4" />
                    Security
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <Palette className="h-4 w-4" />
                    Appearance
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    <Globe className="h-4 w-4" />
                    Privacy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />

              <CardHeader className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Profile Information
                    </CardTitle>
                    <CardDescription className="text-base">
                      Update your account profile information
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 ring-4 ring-blue-100 dark:ring-blue-900">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xl">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-gray-500">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={user?.name}
                      className="border-2 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      disabled
                      className="bg-gray-50 dark:bg-gray-800 border-2"
                    />
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue={user?.name
                        ?.toLowerCase()
                        .replace(/\s+/g, "")}
                      className="border-2 focus:border-blue-500 transition-colors"
                      placeholder="username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      defaultValue="Writer & storyteller"
                      className="border-2 focus:border-blue-500 transition-colors"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="relative border-t bg-gray-50/50 dark:bg-gray-800/50">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Change Password</CardTitle>
                    <CardDescription className="text-base">
                      Ensure your account is secure with a strong password
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="current-password"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-blue-600" />
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      className="border-2 focus:border-blue-500 transition-colors pr-10"
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      className="border-2 focus:border-blue-500 transition-colors pr-10"
                      placeholder="Enter new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      className="border-2 focus:border-blue-500 transition-colors pr-10"
                      placeholder="Confirm new password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">
                    Password requirements:
                  </p>
                  <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      At least 8 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Contains at least one uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3" />
                      Contains at least one number
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-3 w-3" />
                      Contains special character
                    </li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-gray-50/50 dark:bg-gray-800/50">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-auto">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Notifications</CardTitle>
                    <CardDescription className="text-base">
                      Manage how you receive notifications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications in browser
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Comment Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Get notified when someone comments on your blog
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Like Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Get notified when someone likes your blog
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Palette className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Appearance</CardTitle>
                    <CardDescription className="text-base">
                      Customize your viewing experience
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Theme Color</Label>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 cursor-pointer" />
                    <div className="h-8 w-8 rounded-full bg-indigo-600 ring-2 ring-offset-2 ring-transparent hover:ring-indigo-600 cursor-pointer" />
                    <div className="h-8 w-8 rounded-full bg-purple-600 ring-2 ring-offset-2 ring-transparent hover:ring-purple-600 cursor-pointer" />
                    <div className="h-8 w-8 rounded-full bg-green-600 ring-2 ring-offset-2 ring-transparent hover:ring-green-600 cursor-pointer" />
                    <div className="h-8 w-8 rounded-full bg-red-600 ring-2 ring-offset-2 ring-transparent hover:ring-red-600 cursor-pointer" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Privacy</CardTitle>
                    <CardDescription className="text-base">
                      Control your privacy settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Public Profile</Label>
                    <p className="text-sm text-gray-500">
                      Allow others to see your profile
                    </p>
                  </div>
                  <Switch
                    checked={publicProfile}
                    onCheckedChange={setPublicProfile}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Email</Label>
                    <p className="text-sm text-gray-500">
                      Display your email on your profile
                    </p>
                  </div>
                  <Switch
                    checked={false}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Search Engines</Label>
                    <p className="text-sm text-gray-500">
                      Let search engines index your profile
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-red-600 dark:text-red-400">
                      Danger Zone
                    </CardTitle>
                    <CardDescription className="text-base">
                      Irreversible and destructive actions
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Separator className="mb-4 bg-red-200 dark:bg-red-900" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Delete Account
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white whitespace-nowrap"
                      >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl flex items-center gap-2">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base">
                          This action cannot be undone. This will permanently
                          delete your account and remove all your blogs,
                          comments, and likes from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-gradient-to-r from-red-600 to-rose-600 text-white">
                          Yes, delete my account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
