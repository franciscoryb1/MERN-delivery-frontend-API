import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useEffect } from 'react';

// uso ZOD para definir esquemas de validación de datos en TypeScript

// Definir el esquema de validación para el formulario de perfil de usuario
const formSchema = z.object({
    email: z.string().optional(), // Opcional porque este campo es solo de lectura
    name: z.string().min(1, 'Name is required'), // requerido y minimo 1 caracter
    addressLine1: z.string().min(1, 'AddressLine1 is required'), // requerido y minimo 1 caracter
    city: z.string().min(1, 'City is required'), // requerido y minimo 1 caracter
    country: z.string().min(1, 'Country is required'), // requerido y minimo 1 caracter
});


// 
type UserFormData = z.infer<typeof formSchema>; // Tipo de datos para el formulario de perfil de usuario

type Props = {
    currentUser: User,
    onSave: (UserProfileData: UserFormData) => void;
    islLoading: boolean;
}

// Componente de formulario de perfil de usuario
const UserProfileForm = ({ currentUser, onSave, islLoading }: Props) => {

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema), // Resolver de Zod para React Hook Form, se usa para validar los datos del formulario, con las validaciones que defini en el formSchema
        defaultValues: currentUser, // Valores iniciales del formulario: porque el formSchema tiene las mismas propiedades que el objeto currentUser, React Hook Form asignará automáticamente los valores de currentUser a los campos del formulario
    });

    // El useEffect restablece el formulario con los valores actuales de currentUser cada vez que currentUser cambia.
    useEffect(() => {
        form.reset(currentUser); // Restablecer el formulario con los valores actuales de currentUser cuando cambie currentUser
    }, [currentUser, form]);

    return (
        <Form {...form}>
            {/* handleSubmit valida y envía los datos del formulario a onSave */}
            <form onSubmit={form.handleSubmit(onSave)} className='space-y-4 bg-gray-50 rounded-lg md:p-10'>
                <div>
                    <h2 className='text-2xl font-bold'>User Profile Form</h2>
                    <FormDescription>
                        View and change your user profile information here.
                    </FormDescription>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className='bg-white' />
                                </FormControl>
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <div className='flex flex-col md:flex-row gap-4'>
                    <FormField
                        control={form.control}
                        name="addressLine1"
                        render={({ field }) => {
                            return (
                                <FormItem className='flex-1'>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input {...field} className='bg-white' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => {
                            return (
                                <FormItem className='flex-1'>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} className='bg-white' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => {
                            return (
                                <FormItem className='flex-1'>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} className='bg-white' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>

                {islLoading ? (<LoadingButton />) : (
                    <Button type='submit' className='bg-orange-500'>Submit</Button>
                )}

            </form>
        </Form>
    )

}

export default UserProfileForm;

/**
 * Esquema de validación para el formulario de perfil de usuario.
 * Utiliza Zod para definir y validar los datos del formulario.
 * 
 * Campos:
 * - email: Opcional porque este campo es solo de lectura.
 * - name: Requerido y debe tener al menos 1 caracter.
 * - addressLine1: Requerido y debe tener al menos 1 caracter.
 * - city: Requerido y debe tener al menos 1 caracter.
 * - country: Requerido y debe tener al menos 1 caracter.
 */

/**
 * Tipo de datos para el formulario de perfil de usuario.
 * Utiliza la inferencia de tipos de Zod para generar el tipo a partir del esquema de validación.
 */