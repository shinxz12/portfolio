import { Blog } from "@/app/components/homepage/blog/types";
import { personalData } from "@/utils/data/personal-data";

export async function getBlogs(revalidate: number = 60): Promise<Blog[]> {
    const res = await fetch(
        `https://dev.to/api/articles?username=${personalData.devUsername}`,
        { next: { revalidate } }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data: Blog[] = await res.json();
    return data;
};
