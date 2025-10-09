import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/header";

export default function Home() {
  return (
    <div className="m-6 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão do estoque</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
    </div>
  );
}
