import axios from "axios";
import React from "react";
import { NoobUserRole } from "../../src/backend/utils/api-middle-ware/noob-user-role";
import AuthGuard from "../../src/frontend/components/auth/auth-guard";
import HomeCarouselPageForm from "../../src/frontend/components/home-carousel-page-form";
import NotFound from "../../src/frontend/components/not-found/not-found";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import { useRouter } from "next/router";
const requiredRoles: NoobUserRole[] = [];

const HomeCarouselFormCard: React.FC<void> = () => {
  const router = useRouter();
  const handleSubmit = async (data: any): Promise<any> => {
    const headers = await getAuthHeader();
    try {
      axios
        .post(
          "/api/home-carousel/create",
          {
            name: data.name,
            subtitle: data.subtitle,
            navigation: data.navigation,
            image: data.image,
          },
          { headers: headers }
        )
        .then(() => {
          router.push("/home-carousel");
        })
        .catch((error) => {
          console.log("Error: Error while creating home carousel.", error);
          window.alert("Something went wrong");
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
      <HomeCarouselPageForm
        key={"home-carousel-page-form"}
        onSave={(data): void => {
          handleSubmit(data);
        }}
      ></HomeCarouselPageForm>
    </AuthGuard>
  );
};

export default HomeCarouselFormCard;
