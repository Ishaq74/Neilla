import axios from 'axios';

const API_URL = '/api/team-members';

export type TeamMember = Record<string, unknown>;

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function createTeamMember(member: TeamMember): Promise<TeamMember> {
  const { data } = await axios.post(API_URL, member);
  return data;
}

export async function updateTeamMember(id: string, member: TeamMember): Promise<TeamMember> {
  const { data } = await axios.put(`${API_URL}/${id}`, member);
  return data;
}

export async function deleteTeamMember(id: string | number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
