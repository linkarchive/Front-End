import HashTag from '@/components/HashTag';

const HashTagList = ({
  tags,
  handleDelete,
}: {
  tags: string[];
  handleDelete: (title: string) => void;
}) => {
  return (
    <>
      {tags.map((text) => (
        <HashTag key={text} title={text} isDeletable onClick={({ text: t }) => handleDelete(t)} />
      ))}
    </>
  );
};

export default HashTagList;
