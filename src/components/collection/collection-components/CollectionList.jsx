import React, { useEffect, useState } from "react";
import CollectionItem from "./CollectionItem";
import { BsPlusCircleFill } from "react-icons/bs";
import Loading from "../../ui/Loading";

function CollectionList({
  user,
  collections,
  getCollection,
  setIsShowingPopup,
  setError,
}) {
  return (
    <div className="w-full flex items-center justify-center mt-6 select-none">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => setIsShowingPopup(true)}
          className="w-full min-h-40 flex justify-center items-center  flex-col collection-item bg-primary-100 rounded-lg p-6 cursor-pointer border-2 border-primary "
        >
          <BsPlusCircleFill size={40} className="text-primary " />
        </div>
        {collections ? (
          collections.length === 0 ? (
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Click on the plus button to add a collection.
            </p>
          ) : (
            collections.map((coll) => (
              <CollectionItem
                key={coll.id}
                coll={coll}
                user={user}
                getCollection={getCollection}
                setError={setError}
              />
            ))
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default CollectionList;
