"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

interface AuthModalProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<div className="flex justify-center">
						<DialogTitle>Welcome back</DialogTitle>
					</div>
				</DialogHeader>

				<Tabs defaultValue="signin" className="w-full mt-4">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="signin">Sign In</TabsTrigger>
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
					</TabsList>

					<TabsContent value="signin" className="mt-4">
						<SignInForm onClose={() => onOpenChange(false)} />
					</TabsContent>

					<TabsContent value="signup" className="mt-4">
						<SignUpForm onClose={() => onOpenChange(false)} />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
