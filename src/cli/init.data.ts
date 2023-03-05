import InitiativeDataService from "../services/initiative.service";
import { InitiativeType } from "../types/initiative.type";

//initialize data
const projects = [
    {
        id: "1",
        img: "assets/events/vote.png",
        name: "Let's Vote Campaign",
        dateRange: "7/24 - 11/9",
        fav: false,
    },
    {
        id: "2",
        img: "assets/events/stem.png",
        name: "APPI Campaign",
        dateRange: "9/12 - 10/3",
        fav: false,
    },
    {
        id: "3",
        featured: false,
        img: "assets/events/stem.png",
        name: "Stem Education",
        dateRange: "9/12 - 10/3",
        fav: false,
    },
    {
        id: "4",
        featured: true,
        img: "assets/events/donate.png",
        name: "ESL Teacher Wanted",
        dateRange: "9/12 - 10/3",
        fav: false,
    },
    {
        id: "5",
        featured: false,
        img: "assets/events/vote.png",
        name: "Let's Vote Campaign",
        dateRange: "9/12 - 10/3",
        fav: false,
    },
    {
        id: "6",
        featured: true,
        img: "assets/events/stem.png",
        name: "APPI Campaign",
        dateRange: "9/12 - 10/3",
        fav: false,
    },
    {
        id: "7",
        featured: false,
        img: "assets/events/stem.png",
        name: "Stem Education",
        dateRange: "9/12 - 10/3",
        fav: false,
    },
    {
        id: "8",
        featured: true,
        img: "assets/events/donate.png",
        name: "ESL Teacher Wanted",
        dateRange: "9/12 - 10/3",
        fav: false,
    }
];

let lastDocId: string = "";
async function initData(): Promise<string[]> {
    let promises: Promise<string>[] = [];
    projects.forEach(initiative => {
        //return; //comment this line to create initial data

        promises.push(InitiativeDataService.create({
            name: initiative.name,
            created_by: "1",
            admins: ["1"],
            date_range: initiative.dateRange + ":" + initiative.id,
            description: "initiative description",
            causes: [{ cause_id: "cause 1" }, { cause_id: "cause 2" }],
            create_time: new Date(),
            update_time: new Date(),
            image: initiative.img,
            type: InitiativeType.virtual,
            published: true,
            featured: true,
            statistics: {
                likes: 0,
                comment_counts: 0,
                views: 0,
                shared_counts: 0,
                applicants: 0,
                participants: 0,
            }
        }));
    });
    return await Promise.all(promises);
}

// Initialize Firebase
const ids =initData().then(
    (ids: string[]) => {
        console.log("Created new initiatives successfully!:" + ids);
        lastDocId = ids[ids.length - 1];
        process.exit(0)
    }
).catch((e: Error) => {
    console.log(e);
    process.exit(-1)
}
)