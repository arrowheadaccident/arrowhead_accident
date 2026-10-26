import { MDXRemote } from "next-mdx-remote/rsc";
import { business } from "@/config/business";
import { Address, CallCta, Hours, Phone, ServiceAreas } from "@/components/BusinessInfo";
import { ValueProps } from "@/components/ValueProps";

function BusinessName({ legal = false }: { legal?: boolean }) {
  return <>{legal ? business.legalName : business.name}</>;
}

/** Components content authors can use in content/*.mdx. Each one reads business.ts. */
const components = { Phone, Address, Hours, ServiceAreas, CallCta, BusinessName, ValueProps };

export function MdxContent({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div className={`prose prose-arrowhead ${className}`}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
