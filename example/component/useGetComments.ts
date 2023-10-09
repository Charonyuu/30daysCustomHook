import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function useGetComments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [postId, setPostId] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        setComments((prev) => [...prev, ...data]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [postId]);

  const observer = useRef<IntersectionObserver | null>(null);
  const intersectioningRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPostId((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return { loading, comments, intersectioningRef, postId };
}
