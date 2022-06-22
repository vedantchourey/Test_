import axios from "axios";
import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import NewsPageForm from "../../src/frontend/components/news-page-form";
import NotFound from "../../src/frontend/components/not-found/not-found";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import { useRouter } from "next/router";
const requiredRoles: NoobUserRole[] = [];

const NewsPageFormCard: React.FC<void> = () => {
  const router = useRouter();
  const handleSubmit = async (data: any): Promise<any> => {
    const headers = await getAuthHeader();

    axios
      .post(
        "/api/news/create",
        {
          title: data.title,
          subtitle: data.subtitle,
          author: data.authorname,
          image: data.banner,
          description: data.description,
        },
        { headers: headers }
      )
      .then(() => {
        router.push("/news-page");
      })
      .catch(() => {
        window.alert("Something went wrong");
      });
  };
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
      <NewsPageForm
        key={"newspage-form"}
        onSave={(data): void => {
          handleSubmit(data);
        }}
      ></NewsPageForm>
    </AuthGuard>
  );
};

export default NewsPageFormCard;
