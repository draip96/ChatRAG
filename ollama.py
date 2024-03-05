# Just runs .complete to make sure the LLM is listening
from llama_index.llms import Ollama
from pathlib import Path
import qdrant_client
from llama_index import (
    VectorStoreIndex,
    ServiceContext,
    download_loader,
)
from llama_index.llms import Ollama
from llama_index.storage.storage_context import StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore


JSONReader = download_loader("JSONReader")
loader = JSONReader()

class Ollama_model:
    def __init__(self, model="mistral"):
        self.llm = Ollama(model=model)
        self.documents = loader.load_data(Path('./data/tinytweets.json'))
        self.client = qdrant_client.QdrantClient(
            path="./qdrant_data"
        )
        self.vector_store = QdrantVectorStore(client=self.client, collection_name="tweets")
        self.storage_context = StorageContext.from_defaults(vector_store=self.vector_store)
        self.service_context = ServiceContext.from_defaults(llm=self.llm,embed_model="local")
        self.index = VectorStoreIndex.from_documents(self.documents,service_context=self.service_context,storage_context=self.storage_context)
        self.query_engine = self.index.as_query_engine()

    def get_answer(self, input):        
        response = self.query_engine.query(input)
        return response

    def change_dataset(self, name, filename):
        print(filename)
        self.documents = loader.load_data(Path('./uploads/'+filename))
        self.vector_store = QdrantVectorStore(client=self.client, collection_name=name)
        self.storage_context = StorageContext.from_defaults(vector_store=self.vector_store)
        self.index = VectorStoreIndex.from_documents(self.documents,service_context=self.service_context,storage_context=self.storage_context)
        self.query_engine = self.index.as_query_engine()

