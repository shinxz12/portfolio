import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export const getProjects = async () => {
    await dbConnect();
    const projectData = await Project.find({}).sort({priority: 1}).lean();
    const projects = JSON.parse(JSON.stringify(projectData));
    return projects
}
