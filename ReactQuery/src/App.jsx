import "./App.css";
import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";

const POSTS = [
  {id : 1 , title : "izhar"},
  {id : 2 , title : "mohammed"}
]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function App() {
  console.log(POSTS);
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey : ["posts"],
    queryFn : ()=> wait(1000).then(()=>[...POSTS])
  })

  const newPostMutation = useMutation({
    mutationFn : title =>{
      return wait(1000).then(()=>{
        POSTS.push({id : crypto.randomUUID() , title})
      })
    },
    onSuccess : ()=>{
      queryClient.invalidateQueries(["posts"])
    }
    
  })

  if(postQuery.isLoading) return <h1>Loading ...</h1>
  if(postQuery.isError){
    return <p>{JSON.stringify(postQuery.error)}</p>
  }

  return (
    <>
    {
      postQuery.data.map(post=>(
        <div key={post.id}>{post.title}</div>
      ))
    }
    <button onClick={()=>newPostMutation.mutate("New post")}>Add new</button>
    </>
  )
}

export default App;
