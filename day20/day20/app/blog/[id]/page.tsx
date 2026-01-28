type Props = {

    params: Promise<{ id: string }>;

};

 

export default async function BlogPost({ params }: Props) {

    const { id } = await params;

 

    return (

        <div>

            <h1>Blog Post ID: {id}</h1>

        </div>

    );

}