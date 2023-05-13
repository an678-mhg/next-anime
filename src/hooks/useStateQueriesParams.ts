import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Queries {
  [key: string]: string | string[];
}

const useStateQueriesParams = (state: Queries) => {
  const router = useRouter();
  const [queries, setQueries] = useState<Queries>({});

  useEffect(() => {
    for (let key in state) {
      if (typeof state[key] === "string" && state[key]) {
        setQueries({ ...queries, [key]: state[key] });
      }

      if (
        typeof state[key] === "object" &&
        (state[key] as string[]).length > 0
      ) {
        setQueries({
          ...queries,
          [key]: state[key],
        });
      }
    }
  }, [state]);

  useEffect(() => {
    router.push({
      query: {
        ...queries,
      },
    });
  }, [queries]);
};

export default useStateQueriesParams;
