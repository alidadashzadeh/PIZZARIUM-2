"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface AuthModalProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Welcome</DialogTitle>
				</DialogHeader>

				<Tabs defaultValue="signin" className="w-full mt-4">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="signin">Sign In</TabsTrigger>
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
					</TabsList>

					{/* Sign In Tab */}
					<TabsContent value="signin" className="mt-4">
						<SignInForm />
					</TabsContent>

					{/* Sign Up Tab */}
					<TabsContent value="signup" className="mt-4">
						<SignUpForm />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
