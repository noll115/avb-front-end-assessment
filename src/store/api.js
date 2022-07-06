/// mock data as if it came from api

const mockComments = [
  {
    id: 1,
    name: "Eliseo Gardner",
    comment:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    id: 2,
    name: "Jayne Kuhic",
    comment:
      "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
  {
    id: 3,
    name: "Nikita Garfield",
    comment:
      "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
  },
  {
    id: 4,
    name: "Lew Alysha",
    comment:
      "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
  },
  {
    id: 5,
    name: "Hayden Althea",
    comment:
      "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
  },
  {
    id: 6,
    name: "Eliseo Gardner",
    comment:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    id: 7,
    name: "Eliseo Gardner",
    comment:
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
  },
  {
    id: 8,
    name: "Jayne Kuhic",
    comment:
      "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
  },
];

const URL = "https://jsonplaceholder.typicode.com/comments";

/*
  used to sync mock comments,API comments and created comment IDs
  since mock and API comments can have the same IDs causing issues when rendering
*/
let commentId = 0;

//API communication functions

//obtains comments from API, combine with mock and recreate all comments IDs to not have duplicates
const getComments = async () => {
  const resp = await fetch(URL);
  if (!resp.ok) {
    throw Error("Failed to fetch comments");
  }
  //keep data field between API and mock consistent
  return [...mockComments, ...(await resp.json())].map((comment) => ({
    ...comment,
    body: comment.body || comment.comment,
    id: commentId++,
  }));
};

// new comment assigned ID for react key
const addComment = (newComment) => {
  newComment.id = commentId++;
  return newComment;
};

export { addComment, getComments, mockComments };
