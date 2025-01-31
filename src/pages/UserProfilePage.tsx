import { useGetMyUser, useUpdateMyuser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

// este componente se encarga de obtener el usuario actual y mostrar el formulario de edición de perfil
const UserProfilePage = () => {

  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyuser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm currentUser={currentUser} onSave={updateUser} islLoading={isUpdateLoading} />
  );
}

export default UserProfilePage;