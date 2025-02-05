import { ScratchToReveal } from "@/components/ui/scratch-to-reveal";

const ScratchToRevealDemo = () => {
  const handleComplete = () => {
    // Do something after scratch completion
  };

  return (
    <ScratchToReveal
      width={250}
      height={250}
      minScratchPercentage={70}
      className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
      onComplete={handleComplete}
      text="Scratching Me!"
      textStyle={{ fontSize: "5px" }} // Add the text size here
    >
      <p></p>
    </ScratchToReveal>
  );
};

export default ScratchToRevealDemo;
