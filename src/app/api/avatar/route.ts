import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server"; // adjust path

export async function POST(req: Request) {
	const supabase = await createSupabaseServerClient();

	// 1 Get authenticated user from cookies
	const {
		data: { user },
		error: authError,
	} = await supabase.auth.getUser();

	if (authError || !user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const userId = user.id;

	// 2 Parse incoming formData
	const formData = await req.formData();
	const file = formData.get("file");

	if (!(file instanceof File)) {
		return NextResponse.json({ error: "Invalid file" }, { status: 400 });
	}

	// 3 Fetch existing avatar
	const { data: profile, error: fetchError } = await supabase
		.from("profiles")
		.select("avatar")
		.eq("id", userId)
		.single();

	if (fetchError) {
		return NextResponse.json({ error: fetchError.message }, { status: 400 });
	}

	// 4 Delete old avatar IF owned
	if (profile?.avatar) {
		const oldFileName = profile.avatar.split("/").pop();

		if (oldFileName && oldFileName.startsWith(userId)) {
			await supabase.storage.from("avatars").remove([oldFileName]);
		}
	}

	// 5️⃣ Upload new avatar
	const filePath = `${userId}-${Date.now()}.webp`;

	const { error: uploadError } = await supabase.storage
		.from("avatars")
		.upload(filePath, file, {
			upsert: false,
			contentType: file.type,
		});

	if (uploadError) {
		return NextResponse.json({ error: uploadError.message }, { status: 400 });
	}

	const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

	// 6️⃣ Update profile
	const { data: updated, error: updateError } = await supabase
		.from("profiles")
		.update({ avatar: publicUrl })
		.eq("id", userId)
		.select("*")
		.single();

	if (updateError) {
		return NextResponse.json({ error: updateError.message }, { status: 400 });
	}

	return NextResponse.json(updated);
}
