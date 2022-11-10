export default function Courses({ params }: { params: { slug: string } }) {
  return <div>{JSON.stringify(params)}</div>;
}
