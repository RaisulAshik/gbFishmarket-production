import { IProductsData } from "../../../data/produtsData";

interface ICardProps {
  product: IProductsData;
}

const Card = ({ product }: ICardProps) => {
  const { id, name, description, image } = product;
  return (
    <div className="flex flex-col p-6 my-4 max-w-7xl md:flex-row md:justify-around">
      {/* image portion */}
      <div className="pb-4 md:w-1/3 lg:w-64">
        <img
          className="object-contain w-full max-h-72 rounded-3xl md:mt-12 md:h-64 md:object-cover "
          src={image}
          alt="mugil-cephalus"
        />
      </div>
      {/* end of image portion */}
      <div className="pl-6 md:w-2/3 md:">
        <div className="flex flex-col items-center justify-center">
          <h2 className="w-full py-4 text-2xl font-bold leading-8 font-montserrat">
            {name}
          </h2>
          <p className="text-lg leading-8 font-montserrat">{description}.</p>
          <p className="text-lg leading-8 font-montserrat">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
