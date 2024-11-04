import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";



export async function PATCH(request: NextRequest,
    {params}:{params:{id:string}})
    {

        const session = await getServerSession(authOptions);

  if(!session)
    return NextResponse.json({},{status:401});

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const issue = await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })

    if (!issue)
        return NextResponse.json({error:"Invalid Issue"}, {status: 404});

    const updatedIssue  = await prisma.issue.update({
        where:{id:parseInt(params.id)},
        data:{
            title: body.title,
            description : body.description
        }
    });


    return NextResponse.json(updatedIssue, {status:201});
}


export async function DELETE(request: NextRequest,
    {params}:{params:{id:string}})
    {
        const session = await getServerSession(authOptions);

  if(!session)
    return NextResponse.json({},{status:401});

        const issue = await prisma.issue.findUnique({
            where:{id:parseInt(params.id)}
        });

        if (!issue)
            return NextResponse.json({error:"Invalid Issue"}, {status: 404});
    
        await prisma.issue.delete({
            where:{id:parseInt(params.id)}            
        });

        return NextResponse.json({}, {status:201});
    }

    // Utility delay function with ms parameter typed as number

  
