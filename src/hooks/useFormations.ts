import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFormations, getAdminFormations, createFormation, updateFormation, deleteFormation } from '@/lib/apiFormations';
import { staticFormations } from '@/lib/staticData';

export interface Formation {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  price: number;
  max_students: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useFormations() {
  return useQuery({
    queryKey: ['formations'],
    queryFn: async () => {
      try {
        const data = await getFormations();
        return data as Formation[];
      } catch (error) {
        console.warn('Using static formations data:', error?.message);
        return staticFormations.map(f => ({
          ...f,
          max_students: 10,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
      }
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminFormations() {
  return useQuery({
    queryKey: ['admin-formations'],
    queryFn: async () => {
      const data = await getAdminFormations();
      return data as Formation[];
    },
  });
}

export function useCreateFormation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formation: Omit<Formation, 'id' | 'created_at' | 'updated_at'>) => {
      const data = await createFormation(formation);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
    },
  });
}

export function useUpdateFormation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...formation }: Partial<Formation> & { id: string }) => {
      const data = await updateFormation(id, formation);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
    },
  });
}

export function useDeleteFormation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteFormation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
    },
  });
}
