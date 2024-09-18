// app/api/expenses/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.expense.delete({
    where: { id },
  });
  return new NextResponse(null, { status: 204 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const { amount, category } = await request.json();
  const updatedExpense = await prisma.expense.update({
    where: { id },
    data: { amount, category },
  });
  return NextResponse.json(updatedExpense);
}