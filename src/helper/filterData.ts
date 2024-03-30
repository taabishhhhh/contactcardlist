import { UserInterface } from "@/interfaces";

export const filterUsers = (data: UserInterface[], query: string) => {
  query = query.toLowerCase();

  return data.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(query);
    const emailMatch = item.email.toLowerCase().includes(query);
    const usernameMatch = item.username.toLowerCase().includes(query);
    const companyMatch = item.company.name.toLowerCase().includes(query);
    const websiteMatch = item.website.toLowerCase().includes(query);

    return (
      nameMatch || emailMatch || usernameMatch || companyMatch || websiteMatch
    );
  });
}