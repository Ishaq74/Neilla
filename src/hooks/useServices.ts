import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getServices, getAdminServices, createService, updateService, deleteService } from '@/lib/apiServices';
import { staticServices } from '@/lib/staticData';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const data = await getServices();
        return data as Service[];
      } catch (error) {
        console.warn('Using static services data:', error?.message);
        return staticServices.map(s => ({
          ...s,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminServices() {
  return useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const data = await getAdminServices();
      return data as Service[];
    },
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
      const data = await createService(service);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...service }: Partial<Service> & { id: string }) => {
      const data = await updateService(id, service);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    },
  });
}
