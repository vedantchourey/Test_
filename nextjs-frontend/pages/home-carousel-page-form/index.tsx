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
  const createCarousel = async (data: any): Promise<any> => {
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
        .catch(() => {
          window.alert("Something went wrong");
        });
    } catch (error) {
      console.warn("Error: ", error);
    }
  };

  const updateCarousel = async (data: any, id: string): Promise<any> => {
    const headers = await getAuthHeader();
    try {
      axios
        .patch(
          `/api/home-carousel/update/${id}`,
          {
            id: id,
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
        .catch(() => {
          window.alert("Something went wrong");
        });
    } catch (error) {
      console.warn("Error: ", error);
    }
  }

  return (
    <AuthGuard
      requiredRoles={requiredRoles}
      redirectToOnFailure="/"
      renderOnCheckFailure={(): JSX.Element => <NotFound />}
    >
      <HomeCarouselPageForm
        key={"home-carousel-page-form"}
        onSave={(data, id): void => {
          !id ? createCarousel(data) : updateCarousel(data, id)
        }}
      ></HomeCarouselPageForm>
    </AuthGuard>
  );
};

export default HomeCarouselFormCard;
