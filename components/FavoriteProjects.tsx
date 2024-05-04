import { ProjectsCard } from "@/lib/interface";
import Image from "next/image";

export async function FavoriteProjects() {
  const data: ProjectsCard[] = [
    {
      title: "E-commerce Website",
      _id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1564865878688-9a244444042a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      description:
        "A fully functional e-commerce website built with React for the frontend, Node.js for the backend, and MongoDB for the database. It features a responsive design and secure checkout process.",
      link: "https://example.com/ecommerce",
    },
    {
      title: "Task Management App",
      _id: "2",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
      tags: ["Flutter", "Firebase"],
      description:
        "A task management app developed using Flutter and Firebase. Users can create, edit, and delete tasks, set deadlines, and receive notifications.",
      link: "https://example.com/task-app",
    },
    {
      title: "Portfolio Website",
      _id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A personal portfolio website showcasing projects, skills, and contact information. Built with HTML, CSS, and JavaScript for interactivity.",
      link: "https://example.com/portfolio",
    },
  ];

  return (
    <div className="py-10 grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 grid-cols-1">
      {data.map((item) => (
        <a
          href={item.link}
          key={item._id}
          className="group block"
          target="_blank"
        >
          <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-2xl relative">
            <Image
              src={item.imageUrl}
              alt="Image Description"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-2xl"
            />
          </div>
          <div className="mt-4">
            <h2 className="font-medium text-lg hover:underline">
              {item.title}
            </h2>
            <p className="mt-1 text-muted-foreground line-clamp-3">
              {item.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tagItem, index) => (
                <span
                  className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary ring-2 ring-inset ring-primary/20"
                  key={index}
                >
                  {tagItem}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
