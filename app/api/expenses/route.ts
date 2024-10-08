// app/api/expenses/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const expenses = await prisma.expense.findMany();
  return NextResponse.json(expenses);
}

export async function POST(request: Request) {
  const { amount, category, date, time, location, description } = await request.json();
  const expense = await prisma.expense.create({
    data: { 
      amount: parseFloat(amount), 
      category, 
      date: new Date(date), 
      time, 
      location, 
      description 
    },
  });
  return NextResponse.json(expense, { status: 201 });
}