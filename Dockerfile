#FROM dirigiblelabs/dirigible-sap-kyma:latest
FROM dirigiblelabs/dirigible-sap-cf:5.6.0-preview

RUN mkdir -p $CATALINA_HOME/target/dirigible/repository/root/registry/public/
COPY voting/ $CATALINA_HOME/target/dirigible/repository/root/registry/public/voting/

ENV DIRIGIBLE_THEME_DEFAULT=fiori
ENV DIRIGIBLE_HOME_URL=/services/v4/web/voting/ui/vote/
ENV DIRIGIBLE_DATABASE_NAMES_CASE_SENSITIVE=true