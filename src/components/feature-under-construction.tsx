import Image from "next/image";

export default function FeatureUnderConstruction() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Image src="/illustration/under-construction.svg" alt="illustration" width={500} height={500} />
            <h1 className="text-primary text-xl font-bold">Feature Under Construction</h1>
        </div>
    );
}
