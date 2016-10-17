package org.csspec.feedback.config;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


/**
 * Created by Jatinder Dhawan on 10/11/2016.
 */
@Configuration
@EnableMongoRepositories(basePackages= "org.csspec.feedback", repositoryImplementationPostfix="Impl")
public class MongoConfig extends AbstractMongoConfiguration {
    @Override
    protected String getDatabaseName() {
        return "FeedbackDb";
    }
    @Override
    public Mongo mongo() throws Exception {
        return new MongoClient();
    }
}
