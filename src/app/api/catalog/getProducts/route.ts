import { NextResponse } from "next/server";
import connectToDB from "@/lib/connectToDB";
import CatalogProduct from "@/models/CatalogProduct";

export async function GET() {
  try {
    await connectToDB();
    const catalogProducts = await CatalogProduct.find();
    return NextResponse.json(catalogProducts);
  } catch (error) {
    console.error("Error fetching catalog products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
